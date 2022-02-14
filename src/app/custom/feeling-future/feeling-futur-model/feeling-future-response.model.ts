export class FeelingFutureResponseModel {
  constructor(
    public id?: string,
    public userPseudo?: string,
    public userPrediction?: string,
    public imageType?: string,
    public imageURL?: string,
    public imageLocation?: string,
    public isSuccess?: boolean,
    public date?: string
  ) {}
}
