import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tokenizer = require('gpt-3-encoder');

@Injectable()
export class OpenaiService {
  private readonly openai: OpenAI;
  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({ apiKey: configService.get('OPEN_AI_API_KEY') });
  }

  async summarize(message: string) {
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

    return response.choices[0].message.content;
  }
}
