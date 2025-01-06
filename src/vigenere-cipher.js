const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(direct = true) {
    this.direct = direct; // Флаг для прямого или обратного шифрования
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Алфавит
  }

  _prepareText(text) {
    return text.toUpperCase(); // Приводим текст к верхнему регистру
  }

  _extendKey(message, key) {
    let extendedKey = '';
    let keyIndex = 0;

    for (let i = 0; i < message.length; i++) {
      if (this.alphabet.includes(message[i])) {
        extendedKey += key[keyIndex % key.length].toUpperCase();
        keyIndex++;
      } else {
        extendedKey += message[i]; // Сохраняем символы, не являющиеся буквами
      }
    }

    return extendedKey;
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error('Incorrect arguments!');
    }

    message = this._prepareText(message); // Подготовка сообщения
    key = this._prepareText(key); // Подготовка ключа
    let extendedKey = this._extendKey(message, key); // Расширенный ключ
    let encryptedMessage = '';

    for (let i = 0; i < message.length; i++) {
      if (this.alphabet.includes(message[i])) {
        const p = this.alphabet.indexOf(message[i]);
        const k = this.alphabet.indexOf(extendedKey[i]);
        const encryptedChar = this.alphabet[(p + k) % 26];
        encryptedMessage += encryptedChar; // Добавляем зашифрованный символ
      } else {
        encryptedMessage += message[i]; // Оставляем символ, если это не буква
      }
    }

    return this.direct ? encryptedMessage : encryptedMessage.split('').reverse().join(''); // Возврат результата
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error('Incorrect arguments!');
    }

    encryptedMessage = this._prepareText(encryptedMessage); // Подготовка зашифрованного сообщения
    key = this._prepareText(key); // Подготовка ключа
    let extendedKey = this._extendKey(encryptedMessage, key); // Расширенный ключ
    let decryptedMessage = '';

    for (let i = 0; i < encryptedMessage.length; i++) {
      if (this.alphabet.includes(encryptedMessage[i])) {
        const c = this.alphabet.indexOf(encryptedMessage[i]);
        const k = this.alphabet.indexOf(extendedKey[i]);
        const decryptedChar = this.alphabet[(c - k + 26) % 26]; // Добавляем 26 для избежания отрицательных индексов
        decryptedMessage += decryptedChar; // Добавляем расшифрованный символ
      } else {
        decryptedMessage += encryptedMessage[i]; // Оставляем символ, если это не буква
      }
    }

    return this.direct ? decryptedMessage : decryptedMessage.split('').reverse().join(''); // Возвращаем расшифрованное сообщение
  }
}

module.exports = {
  VigenereCipheringMachine
};
