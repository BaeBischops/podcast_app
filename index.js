let allpods = () => 
{
fetch('https://podcast-api.netlify.app')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // This will log the data from the API to the console
    // You can do further processing with the data here
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
}
const podcasts = {
    id:'',
    name:'',
    imgage:'',
}