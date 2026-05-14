# Security Specification for RT VoltCare

## Data Invariants
- Inquiries must have a valid name, phone, and message.
- Services and FAQs must have a title/question and description/answer.
- Only the specific admin email (td4156828@gmail.com) can modify content or view inquiries.

## The Dirty Dozen Payloads

1. **Unauthorized Service Creation**: Try to create a service as a non-admin.
2. **Unauthorized Inquiry List**: Try to fetch all inquiries as a regular user.
3. **Malicious ID Injection**: Try to create an inquiry with a 2KB string as ID.
4. **Field Poisoning**: Try to add a `role: 'admin'` field to a user profile (even if we don't have user profiles, it's a good test).
5. **Timestamp Spoofing**: Provide a future `createdAt` for an inquiry.
6. **Immutable Field Update**: Try to change the `createdAt` of an existing inquiry.
7. **Service Name Overflow**: Try to set a service title with 5000 characters.
8. **Inquiry Phone Validation**: Send an inquiry with a non-string phone number.
9. **FAQ Question Deletion**: Non-admin trying to delete an FAQ.
10. **Config Tampering**: Non-admin trying to change the contact phone number in `config`.
11. **Batch Inquiry Spam**: Try to write 500 inquiries in a single batch (security rules can limit frequency if we had a counter, but here we just check basic access).
12. **Null Field Injection**: Send an inquiry with a `null` message.

## Test Runner (Logic Check)
- Admin: `td4156828@gmail.com`
- User: `someone@else.com`

- `allow create inquiry`: Anyone (if valid).
- `allow read inquiry`: Admin only.
- `allow write service/faq/config`: Admin only.
- `allow read service/faq/config`: Anyone.
