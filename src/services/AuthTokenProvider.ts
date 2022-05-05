import {createAsyncAuthProvider} from "react-token-auth"
import {AuthTokenResponseI} from "src/models/domain"
import Config from "src/config"

export default createAsyncAuthProvider<AuthTokenResponseI>({
    // getAccessToken: token => token.type + " " + token.token,
    debug: Config.isDevelopment
})
