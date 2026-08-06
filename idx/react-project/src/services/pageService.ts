export const getPages = async () =>{
     try {
      const response = await fetch('/data/pageData.json')
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)

      }      
      return await response.json();
    } catch (error) {
      console.error('Error loading JSON:', error)
    }
}