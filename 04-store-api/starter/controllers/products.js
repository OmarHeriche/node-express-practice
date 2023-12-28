const product = require("../models/product");
const getAllProductsStatic = async (req, res) => {
  const products = await product.find({}).select("name");
  res.status(200).json({ products, nb_elements: products.length });
};
const getAllProducts = async (req, res) => {
  let { featured, company, name, sort, field, limit, numiricFilters } =
    req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  
  const operPos = {
    ">": "$gt",
    ">=": "$gte",
    "<": "$lt",
    "<=": "$lte",
    "=": "$eq",
  };
  const regEx=/\b(<|>|<=|>=|=)\b/g
  let filters = numiricFilters.replace(regEx,(match)=>`-${operPos[match]}-`)
  const options=['price','rating'];
  filters=filters.split(",").forEach((item)=>{
    const [pilila,operator,value]=item.split('-')
    if(options.includes(pilila)){
      queryObject[pilila]={[operator]:Number(value)}
    }
  })
  
  let result = product.find(queryObject);
  if (sort) {
    sort = sort.split(",").join(" ");
    result = result.sort(sort);
  } else {
    result = result.sort("price");
  }
  if (field) {
    field = field.split(",").join(" ");
    result = result.select(field);
  }
  if (limit) {
    result = result.limit(parseInt(limit));
  }

  const products = await result;
  console.log(queryObject);
  res.status(200).json({ products, length: products.length });
};
module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
