import {
    getAllcities,
    getcityById,
    deletecity,
    postcity,
    updatecity,
  } from "./cities/request.ts";
  
  const controller = {
    city: {
      getAll: getAllcities,
      getOne: getcityById,
      post: postcity,
      delete: deletecity,
      update: updatecity,
    },
  };
  
  export default controller;