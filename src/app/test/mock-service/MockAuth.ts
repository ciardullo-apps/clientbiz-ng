import { HttpHeaders } from "@angular/common/http";

export class MockAuth {
    public buildHeaders(): HttpHeaders {
        return new HttpHeaders(
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        )
    }
}