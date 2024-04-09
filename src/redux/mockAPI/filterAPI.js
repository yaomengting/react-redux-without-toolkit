
const filters = {
  status: "All",
  colors: []
}

const filterAPI = {
  changeStatusFilter: async(status)=> {
    filters.status = status;
    return {
      success: true,
      message: "changed status filter",
      data: filters
    }
  },
  changeColorFilter: async(colors)=> {
    filters.colors = colors;
    return {
      success: true,
      message: "changed color filter",
      data: filters
    }
  }
}


export default filterAPI;