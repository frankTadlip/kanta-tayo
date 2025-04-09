// src/classes/User.ts

export default class User {
  firstName: string;
  lastName: string;
  nickname: string;
  birthday: Date;
  gender: string;

  constructor(
    firstName: string,
    lastName: string,
    nickname: string,
    birthday: string,
    gender: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.nickname = nickname;
    this.birthday = new Date(birthday);
    this.gender = gender;
  }

  // You can also add additional methods to this class as per your app's logic
  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  // Example of a method to format the birthday
  getFormattedBirthday(): string {
    const date = new Date(this.birthday);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
}
