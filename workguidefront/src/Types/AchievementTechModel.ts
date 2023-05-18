import AchievementRequestModel from "./AchievementRequestModel"

type AchievementTechModel = AchievementRequestModel & {
  iconUrl: string;
}

export default AchievementTechModel;