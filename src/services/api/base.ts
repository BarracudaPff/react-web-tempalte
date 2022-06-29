import {AuthToken} from "src/models/application"
import {AuthRequest} from "src/models/domain"
import {Email, Phone} from "src/models/types/primitive"

export default interface ApiServiceI {
    loginEmail(req: AuthRequest): Promise<AuthToken>

    logout(): void

    sendApplication(phone: Phone, email: Email, company_name: string, additional_information: string): Promise<null | undefined>
}
