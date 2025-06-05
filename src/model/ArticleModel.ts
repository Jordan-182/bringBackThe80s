export class ArticleModel {
  constructor(
    private _id: number,
    private _title: string,
    private _content: string,
    private _image_path: string,
    private _created_at: string,
    private _category_id: number,
    private _author_id: number
  ) {}

  get id(): number {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  get content(): string {
    return this._content;
  }

  set content(value: string) {
    this._content = value;
  }

  get image_path(): string {
    return this._image_path;
  }

  set image_path(value: string) {
    this._image_path = value;
  }

  get created_at(): string {
    return this._created_at;
  }

  set created_at(value: string) {
    this._created_at = value;
  }

  get category_id(): number {
    return this._category_id;
  }

  set category_id(value: number) {
    this._category_id = value;
  }

  get author_id(): number {
    return this._author_id;
  }

  set author_id(value: number) {
    this._author_id = value;
  }
}
