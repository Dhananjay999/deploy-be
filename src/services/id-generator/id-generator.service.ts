import { Injectable } from '@nestjs/common';

@Injectable()
export class IdGeneratorService {
  public generateCustomId(fullName: string): string {
    const numericIdentifier: string = this.generateRandomNumericString(6);
    const nameParts: string[] = fullName.split(' ');
    const firstInitial: string = nameParts[0].charAt(0).toUpperCase();
    const lastInitial: string =
      nameParts.length > 1
        ? nameParts[nameParts.length - 1].charAt(0).toUpperCase()
        : 'X';
    const suffix: string = this.generateRandomSuffix();
    return `CLI${numericIdentifier}${firstInitial}${lastInitial}${suffix}`;
  }

  public generateWorkerID(professionCode: string): string {
    const numericIdentifier: string = this.generateRandomNumericString(6);
    const suffix: string = this.generateRandomSuffix();
    return `WRK${numericIdentifier}${professionCode}${suffix}`;
  }

  public generatePostId(professionCode: string): string {
    const numericIdentifier: string = this.generateRandomNumericString(6);
    const suffix: string = this.generateRandomSuffix();
    return `PST${numericIdentifier}${professionCode}${suffix}`;
  }

  private generateRandomNumericString(length: number): string {
    let numericString: string = '';
    const numbers: string = '0123456789';
    for (let i = 0; i < length; i++) {
      numericString += numbers[Math.floor(Math.random() * numbers.length)];
    }
    return numericString;
  }

  private generateRandomSuffix(): string {
    const numbers: string = '0123456789';
    const letters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const firstChar: string =
      numbers[Math.floor(Math.random() * numbers.length)];
    const secondChar: string =
      letters[Math.floor(Math.random() * letters.length)];
    return `${firstChar}${secondChar}`;
  }
}
