import { convertFilterStringToObject } from "../utils/converter";

/**
 * Create or Update document by conditions
 * @param {Object} model SchemaModel
 * @param {Object} doc objeto a ser criado ou atulizado
 * @param {Object} conditions condição para criação ou atualizacao
 */
export async function createOrUpdateOne(model, data, conditions) {
  await model.findOneAndUpdate(conditions, data, {
    upsert: true,
    setDefaultsOnInsert: true
  });
}

/**
 * Get All documents by filters
 * @param {Object} model SchemaModel
 * @param {Object} args pagination, filter e sort
 */
export function findAll(model, args) {
  const { pagination, filter, sort } = args;
  const filterObject = convertFilterStringToObject(filter);
  const sortObject = convertFilterStringToObject(sort);

  const documents = model.find(filterObject);
  if (pagination) {
    const page = Math.max(0, pagination.page - 1);
    documents.limit(pagination.perPage).skip(pagination.perPage * page);
  }

  documents.sort(sortObject);

  return documents;
}

/**
 * Get count document by SchemaModel
 * @param {Object} model SchemaModel
 */
export function documentCount(model) {
  return model.estimatedDocumentCount();
}

/**
 * Get document by Id
 * @param {Object} model SchemaModel
 * @param {Object} args id
 */
export function findById(model, args) {
  return model.findById(args.id);
}
