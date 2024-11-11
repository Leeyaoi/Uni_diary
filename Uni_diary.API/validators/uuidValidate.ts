import { ModelStatic, Model } from "sequelize";
import { v4 as uuidv4, validate } from "uuid";

export const uuidValidate = async (
  model: ModelStatic<Model>,
  value: string
) => {
  if (!validate(value)) {
    throw new Error("This is not UUID");
  }
  const exists = await model.findOne({ where: { id: value } });
  if (!exists) {
    throw new Error("ID does not exist in the database");
  }
};
