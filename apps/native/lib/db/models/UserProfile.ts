import { Model } from "@nozbe/watermelondb";
import { field, text } from "@nozbe/watermelondb/decorators";

export default class UserProfile extends Model {
  static table = "user_profiles";

  @text("name") name!: string;
  @field("age") age!: number;
  @text("interest") interest!: string;
  @field("dream_job") dreamJob!: string;
}
