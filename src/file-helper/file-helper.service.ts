import { Injectable } from '@nestjs/common';
import tokenizer from 'gpt-3-encoder';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mammoth = require('mammoth');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WordExtractor = require('word-extractor'); // For DOC files
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pdfParse = require('pdf-parse'); // For PDFs

@Injectable()
export class FileHelperService {
  async processFileToChunks(file: Express.Multer.File) {
    const content = await this.readFile(file);

    return this.splitIntoChunks(content.text);
  }

  // Function to split text into manageable chunks
  splitIntoChunks(text: string, maxTokens = 3000) {
    const chunks = [];
    let currentChunk = '';

    for (const sentence of text.split('.')) {
      const tokens = tokenizer.encode(currentChunk + sentence);
      if (tokens.length > maxTokens) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence + '.';
      } else {
        currentChunk += sentence + '.';
      }
    }

    if (currentChunk) chunks.push(currentChunk.trim());
    return chunks;
  }

  // Function to detect file type and extract text
  async readFile(file: Express.Multer.File) {
    const mimeType = file.mimetype;

    switch (mimeType) {
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': // DOCX
        return await this.processDocx(file);
      case 'application/msword': // DOC
        return await this.processDoc(file);
      case 'application/pdf': // PDF
        return await this.processPdf(file);
      case 'text/plain': // TXT
        return await this.processTxt(file);
      default:
        throw new Error(`Unsupported file type: ${mimeType}`);
    }
  }

  async processDocx(file: Express.Multer.File) {
    try {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      return { type: 'docx', text: result.value };
    } catch (error) {
      throw new Error(`Error processing DOCX: ${error.message}`);
    }
  }

  // Function to process DOC files
  async processDoc(file) {
    try {
      const extractor = new WordExtractor();
      const doc = await extractor.extract(file.buffer);
      return { type: 'doc', text: doc.getBody() };
    } catch (error) {
      throw new Error(`Error processing DOC: ${error.message}`);
    }
  }

  // Function to process PDF files
  async processPdf(file) {
    try {
      const data = await pdfParse(file.buffer);
      return { type: 'pdf', text: data.text };
    } catch (error) {
      throw new Error(`Error processing PDF: ${error.message}`);
    }
  }

  // Function to process TXT files
  async processTxt(file) {
    try {
      const text = file.buffer.toString('utf8'); // Convert Buffer to string
      return { type: 'txt', text };
    } catch (error) {
      throw new Error(`Error processing TXT: ${error.message}`);
    }
  }
}
