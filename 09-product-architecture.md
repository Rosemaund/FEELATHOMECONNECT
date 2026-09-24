# Feel at Home Connect — Product Architecture

## Experience layers

### 1. Consumer mobile app
Core flows:
- onboarding
- need selection
- location/search
- resource details
- save
- Start Over Plan
- progress
- Safety Center
- profile/settings

### 2. Resource intelligence layer
Responsibilities:
- normalized resource records
- category taxonomy
- geospatial search
- eligibility metadata
- hours/availability
- verification state
- freshness timestamps
- user reports

### 3. Provider portal
Organizations can:
- claim their profile
- update services
- update hours/contact information
- request verification
- identify service-area changes
- review public profile

### 4. Admin portal
Staff can:
- add/edit resources
- verify information
- review reports
- approve partner status
- view resource freshness
- manage categories
- audit changes

### 5. Safety/privacy layer
Requirements:
- minimize sensitive data
- encrypt data in transit and at rest
- role-based access
- audit administrative actions
- separate confidential operational information from public resource data
- never expose confidential DV shelter locations
- provide clear privacy controls

## Suggested technical stack
- Mobile: React Native + Expo
- Web: Next.js
- API: TypeScript service/API layer
- Database: PostgreSQL
- Authentication: managed secure authentication provider
- Maps/geocoding: established mapping provider
- Notifications: push/email service
- Hosting: managed cloud infrastructure

## API domains
- `/resources`
- `/search`
- `/categories`
- `/saved`
- `/goals`
- `/partners`
- `/verification`
- `/reports`
- `/profile`
- `/safety`

## Ranking
A resource score should consider:
1. emergency relevance
2. service/category match
3. eligibility match
4. service area
5. open/availability signal
6. verification freshness
7. distance

Verification must never be presented as a guarantee of capacity or eligibility.
