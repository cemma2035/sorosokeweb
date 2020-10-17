
const apiRoute = new Routes;

const {apiOrigin, apiVersion, twitterLogin} = apiRoute;
const status = null;

const twitterLoginBtn = document.querySelector('[data-twitter-login]');

const loginErrorHandling = (status, result) => {
    console.log(status, result)

    if (status !== null) {
        alertify.set('notifier','position', 'top-center');
        alertify.error(`Authentication Failed : ${result.message}`);
        result.hint ? alertify.error(`Authentication Failed : ${result.hint}`) : null
        return false;   
    }
}

const twitterLoginApi = async (e) => {
    e.preventDefault()
    
    twitterLoginBtn.innerHTML = `<div class="spinner-grow" style="color: #fff;" role="status"></div>
        <span style="color: #fff; font-weight: bold;">Loading...</span>`;
    twitterLoginBtn.disabled = true;

    try {
        const response = await fetch(`${apiOrigin}${apiVersion}${twitterLogin}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });

        if (!response.ok) {
            twitterLoginBtn.disabled = false;
            twitterLoginBtn.innerHTML = `   <i class="fab fa-lg fa-twitter mr-2"></i>
            <span>Continue with Twitter</span>`;
            console.log(response.status)
            status = response.status
        }

        const result = await response.json();
        console.log(result)
        loginErrorHandling(status, result)
        if (result.success) {
            twitterLoginBtn.innerHTML = `   <i class="fab fa-lg fa-twitter mr-2"></i>
            <span>Continue with Twitter</span>`;
            console.log(result.authUrl)
            //Call an auth popup
            window.open(result.authUrl, "Twitter Authentication", "height=650, width=600, resizable=yes");
        }

    } catch (error) {
        twitterLoginBtn.disabled = false;
        twitterLoginBtn.innerHTML = `   <i class="fab fa-lg fa-twitter mr-2"></i>
        <span>Continue with Twitter</span>`;
        return false;  
    }

}


twitterLoginBtn.addEventListener('click', (e) => twitterLoginApi(e))