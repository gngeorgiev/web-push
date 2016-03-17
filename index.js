navigator.serviceWorker.register('./worker.js')
    .then(function (registration) {
        return navigator.serviceWorker.ready.then(function (registration) {
            return registration;
        });
    })
    .then(function (registration) {
        return registration.pushManager.getSubscription()
            .then(function (subscription) {
                if (subscription) {
                    return subscription;
                }
                
                return registration.pushManager.subscribe({userVisibleOnly:true});
            });
    })
    .then(function (subscription) {
        fetch('/send?endpoint=' + subscription.endpoint, {
            method: 'post'
        })
    })
