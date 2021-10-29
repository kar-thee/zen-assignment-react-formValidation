import React from "react";
import { ErrorMessage, Formik } from "formik";
import * as yup from "yup";

const ProductForm = () => {
  const initialValue = {
    name: "",
    category: "",
    price: 0,
    desc: "",
    inStock: false,
    material: "",
  };
  const categoryArray = [
    "electronics",
    "garden",
    "automotive",
    "jewelery",
    "kids",
  ];
  const materialArray = ["soft", "hard"];

  let validationSchema = yup.object({
    name: yup.string().required("field required"),
    category: yup
      .string()
      .required("field required")
      .oneOf(
        categoryArray,
        "only electronics/garden/automotive/jewelery/kids available"
      ),
    price: yup
      .number()
      .required("field required")
      .lessThan(1000, "price less than 1000Rs"),
    desc: yup
      .string()
      .required("field required")
      .default("This is a good product"),
    inStock: yup.string().required("field required"),
    material: yup
      .string()
      .required("field required")
      .oneOf(materialArray, "either soft/hard only"),
  });

  const submitFun = (values) => {
    const { price, inStock } = values;
    console.log("price-b", typeof price, price);
    console.log("price-a", typeof parseInt(price), price);
    console.log("inStock-b", typeof inStock, inStock);
    console.log("inStock-a", typeof Boolean(inStock), inStock);
    console.log("Values after submit", values);
  };

  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={submitFun}
        className=""
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            className="container-sm row mx-auto my-5 w-75 card shadow-lg lightgrey p-2"
          >
            <div className="mb-3  col-12  col-md-8">
              <label htmlFor="name" className="col form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="col form-control"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage name="name" class="form-text text-danger" />
            </div>

            <div className=" mb-3  col-12 col-md-8">
              <label htmlFor="category" className="col form-label">
                Category
              </label>
              <select
                name="category"
                className="col form-select"
                value={formik.values.category}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <option value="empty">Select one</option>
                {categoryArray.map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ErrorMessage name="category" class="form-text text-danger" />
            </div>

            <div className=" mb-3 col-12 col-md-8">
              <label htmlFor="price" className="col form-label">
                Price
              </label>
              <input
                type="text"
                name="price"
                className="col form-control"
                value={parseInt(formik.values.price)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage name="price" class="form-text text-danger" />
            </div>

            <div className=" mb-3 col-12 col-md-8">
              <label htmlFor="inStock" className="col form-check-label">
                Stock Availablity
              </label>
              {["yes", "no"].map((el) => (
                <div key={el}>
                  <label>{el === "yes" ? "Available" : "Not-Available"}</label>
                  <input
                    type="radio"
                    name="inStock"
                    className="col form-check-input"
                    value={el}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              ))}
              <ErrorMessage name="inStock" class="form-text text-danger" />
            </div>

            <div className=" mb-3 col-12 col-md-8">
              <label htmlFor="material" className="col form-label">
                Material-Type
              </label>
              <input
                type="text"
                name="material"
                className="col form-control"
                value={formik.values.material}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <ErrorMessage name="material" class="form-text text-danger" />
            </div>

            <div className=" mb-3 col-12 col-md-8">
              <label htmlFor="desc" className="col form-label">
                Description
              </label>
              <textarea
                name="desc"
                className="col form-control"
                placeholder="product desc..."
                {...formik.getFieldProps("desc")}
              />
              <ErrorMessage name="desc" class="form-text text-danger" />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ProductForm;
