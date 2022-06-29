import {createAsyncAuthProvider} from "react-token-auth"
import Config from "src/config"
import {AuthToken} from "src/models/application"

export default createAsyncAuthProvider< AuthToken>({
    // getAccessToken: token => token.type + " " + token.token,
    debug: Config.isDevelopment
})
