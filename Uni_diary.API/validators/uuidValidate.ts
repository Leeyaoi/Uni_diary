import { ModelStatic, Model } from "sequelize";

export const uuidValidate = async (model: ModelStatic<Model>, value: any) => {
  const exists = await model.findOne({ where: { id: value } });
  if (!exists) {
    throw new Error("ID does not exist in the database");
  }
};
