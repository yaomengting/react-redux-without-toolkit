
const filters = {
  status: "All",
  colors: []
}

const filterAPI = {
  changeStatusFilter: async(status)=> {
    filters.status = status;
    return {
      success: true,
      message: "change status filter",
      data: filters
    }
  },
}


export default filterAPI;