import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class OpenaiService {
  private readonly openai: OpenAI;
  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({ apiKey: configService.get('OPEN_AI_API_KEY') });
  }

  async summarize(message: string) {
    console.log('#> summarize', message);

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'You will be provided with document, and your task is to summarize it.',
        },
        { role: 'user', content: message },
      ],
    });

    const content = response.choices[0].message.content;
    console.log('#> summarize response', content);

    return content;
  }
}
