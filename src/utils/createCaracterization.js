function createCaracterization() {
  async function getData(){
    try{ 
      return {
        installation_id: null,
        hectare: null,
        city_id: null,
        licensing: false,
        state_id: 999
      } 
    } catch(err) {
      console.warn(err)
    }
  }

  return {
    getData,
  }
}

export default createCaracterization();