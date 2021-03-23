const server_url = "http://localhost:8081";
const serverRequest = async (url = '', data = {}) => {
    const serverResponse = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    try {
        const responseData = await serverResponse.json();
        return responseData;
    } catch (error) {
        console.log(error)
    }
}
const bindUpdateUI = (data)=>{
    document.getElementById('status_code').innerHTML = data.status_code;
    document.getElementById('model').innerHTML = data.model;
    document.getElementById('score_tag').innerHTML = data.score_tag;
    document.getElementById('agreement').innerHTML = data.agreement;
    document.getElementById('subjectivity').innerHTML = data.subjectivity;

}
function handleSubmit(event) {
    event.preventDefault()
    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    //check url is correct formate
    let isValidUrl = Client.checkForName(formText);
    if(!isValidUrl){
        const resultObj = {
            status_code: '',
            model: '',
            score_tag: '',
            agreement: '',
            subjectivity: ''
        }
        bindUpdateUI(resultObj);
        alert("invalid url");
        return;
    }
    //send request to server side
    serverRequest(server_url+'/meaningcloud-api', {
        url: formText
    }).then(res => {
        bindUpdateUI(res);
    });
}

export { handleSubmit }
