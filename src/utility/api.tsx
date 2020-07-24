class Api {

    static async get(route: any, params?: any) {
        return Api.xhr( route, params, "GET" );
    }

    static async xhr( route?: any, params?: any, method?: any, body?: any, isFormtype?: any ) {
        const options: any = {
            headers:  {
                "content-type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            method: method
        };
        if (body) {
            options.body = JSON.stringify(body);
        }
        try {
            const response = await fetch(route, options);
            if (response.headers.get("content-type")) {
                return response.json();
            } else {
                return response.status;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default Api;
