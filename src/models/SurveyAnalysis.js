export class MapPin {
  constructor() {
    this.coordinates = null; // GeoLocation object
    this.status = "";
  }
}

export class SurveyAnalysis {
  constructor() {
    this.id = "";
    this.surveyId = "";
    this.cycle = 0;
    this.mapPins = [];   // list of MapPin
    this.summary = "";
  }
}
