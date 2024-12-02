class ServiceWorkerMessenger{
    constructor(){

    }

    testSend(){
        chrome.runtime.sendMessage({greeting:'hello world'},(response) => {
            console.log('service_worker.response: '+response)
        });
    }

    send(message,response){
        chrome.runtime.sendMessage(message,response);
    }
}