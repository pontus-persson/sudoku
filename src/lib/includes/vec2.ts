export interface IVec2 {
  x: number;
  y: number;
}

export default class Vec2 {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  copy() {
    return new Vec2(this.x, this.y);
  }

  len() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;
    return this;
  }

  setVec(vec: IVec2) {
    this.x = vec.x;
    this.y = vec.y;
    return this;
  }

  add(a: number, b?: number) {
    this.x += a;
    this.y += b?b:a;
    return this;
  }

  addVec(vec: IVec2) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }

  sub(s: number) {
    this.x -= s;
    this.y -= s;
    return this;
  }

  subVec(vec: IVec2) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }

  mul(m: number) {
    this.x *= m;
    this.y *= m;
    return this;
  }

  mulVec(vec: IVec2) {
    this.x *= vec.x;
    this.y *= vec.y;
    return this;
  }

  div(d: number) {
    this.x /= d;
    this.y /= d;
    return this;
  }

  divVec(vec: IVec2) {
    this.x /= vec.x;
    this.y /= vec.y;
    return this;
  }

  toAngle(radians: boolean = true) {
    return radians ? Math.atan2(this.y, this.x) : Math.atan2(this.y, this.x)*(180/Math.PI);
  }

  fromAngle(angle: number, radians: boolean = true) {
    angle = radians ? angle : angle*Math.PI/180;
    this.x = Math.sin(angle);
    this.y = Math.cos(angle);
    return this;
  }

  normalize() {
    var l = this.len();
    if(l != 0) this.div(l);
  }

  limit(limit: number) {
    var l = this.len();
    if(l > limit) {
      this.normalize();
      this.mul(limit);
    }
  }
}
