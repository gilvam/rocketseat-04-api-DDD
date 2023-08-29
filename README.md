# API Forum

## DDD (Domain-driven Design)

## Domain

- Domain Experts
  - Conversation
- Ubiquitous Language

- User
  - Client
  - Supplier
  - Attendant
  - Bartender

- Aggregates
- Value Objects
- Domain Events
- Subdomains (Bounded Contexts)
  - core:
    - purchase
    - catalog
    - payment
    - delivery
    - invoicing

  - supporting: ```it supports CORE to work```
    - example:
      - stock

  - generic: ```it is necessary but not the most important```
    - example:
      - customer notification
      - promotions
      - chat

- Entities
- Use Cases


---------------------

### Mapping the domain 1:
> #### Domain Expert:
>   - I have a lot of difficulty in knowing the doubts of the students
>   - I have to answer the students and I get lost in which questions have already been answered

> #### Dev
>  - Domain entities:
     >    - Answer
     >    - Instructor
     >    - Question
>    - Student
>
>
>  - Actions / use cases:
     >    - answer-question.ts
