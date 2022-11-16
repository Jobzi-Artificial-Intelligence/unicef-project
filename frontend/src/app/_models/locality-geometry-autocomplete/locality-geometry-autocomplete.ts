import { City } from "../city.model";
import { Deserializable } from "../deserializable.model";
import { LocalityGeometry } from "../locality-geometry.model";
import { Region } from "../region.model";
import { State } from "../state.model";

export class LocalityGeometryAutocomplete
  extends LocalityGeometry
  implements Deserializable {
  code: string;
  name: string;

  city?: City;
  state?: State;
  region?: Region;

  constructor() {
    super();
    this.code = '';
    this.name = '';
  }

  deserialize(input: any): this {
    Object.assign(this, new LocalityGeometry().deserialize(input));

    this.code = input.id;
    this.name = input.name;

    if (this.regionId) {
      this.region = new Region(this.regionId, this.regionName);
    }

    if (this.stateId && this.region) {
      this.state = new State(this.stateId, this.stateName, this.region)
    }

    if (this.cityId && this.state) {
      this.city = new City(this.cityId.toString(), this.cityName.toString(), this.state);
    }

    return this;
  }
}
