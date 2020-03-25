export class User {
  static id = 0;

  nickname: string = "";
  colour: string = '#'+(Math.random()*0xFFFFFF<<0).toString(16);

  constructor() {
    this.nickname = "User " + User.id;
    User.id += 1;
  }
}
