import { HttpHeaders } from "@angular/common/http";
import { User } from "src/app/model/user";

export class MockAuth {
    public buildHeaders(): HttpHeaders {
        return new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        )
    }

    public isLoggedIn(): boolean {
        return true
    }

    public getUserInfo(): User {
        return { id: 1234567890, firstName: 'foo', lastName: 'bar', email: 'biz', photo: 'baz'}
    }
}