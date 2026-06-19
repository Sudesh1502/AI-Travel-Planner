# 🌍 NextJourney – AI Travel Planner

## Project Overview

NextJourney is an AI-powered travel planning platform designed to simplify trip organization and itinerary creation. Instead of spending hours researching destinations, accommodations, budgets, and activities, users can generate personalized travel plans in seconds.

By providing details such as destination, trip duration, budget, travel style, group size, and interests, users receive a complete day-by-day itinerary tailored to their preferences. The platform also provides estimated trip costs, recommended hotels, and the ability to regenerate specific days of a trip without affecting the rest of the itinerary.

---

## Tech Stack

### Frontend

* Next.js (App Router)
* React.js
* Tailwind CSS

**Why?**
Next.js offers efficient routing, server-side capabilities, and excellent developer experience. Tailwind CSS enables rapid UI development and helps create a modern, responsive design with minimal custom CSS.

### Backend

* Node.js
* Express.js

**Why?**
Express provides a lightweight and flexible API layer that integrates seamlessly with the frontend while keeping the architecture simple and maintainable.

### Database

* MongoDB
* Mongoose

**Why?**
Travel itineraries contain deeply nested data such as days, activities, hotels, and budgets. MongoDB's document-based structure makes it easy to store and retrieve this data efficiently.

### AI Integration

* OpenAI API

**Why?**
For personalized dynamic itinerary generation based on user preferences, making every trip plan unique.

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file and add:

```
OPENAI_API_KEY
MONGO_DB_URI
PORT
JWT_SECRET
JWT_EXPIRE=8h
GOOGLE_CLIENT_ID
NODE_ENV
FRONTEND
PEXELS_API_KEY
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL
```

Start the frontend:

```bash
npm run dev
```



---

## Deployment

### Frontend (Vercel)

1. Connect the GitHub repository to Vercel.
2. Add the environment variable:

```env
NEXT_PUBLIC_API_URL=<deployed_backend_url>
```

### Backend (Render / Railway / Heroku)

Configure the following environment variables:

```env
OPENAI_API_KEY
MONGO_DB_URI
PORT
JWT_SECRET
JWT_EXPIRE=8h
GOOGLE_CLIENT_ID
NODE_ENV
FRONTEND
PEXELS_API_KEY
```

Make sure CORS is configured to allow requests from the deployed frontend domain.

---

## Architecture Overview

NextJourney follows a client-server architecture.

* The **Next.js frontend** manages the user interface, state management, and routing.
* The **Express backend** handles authentication, trip generation requests, AI interactions, and database operations.
* The **AI layer** generates structured travel itineraries based on user preferences.
* The **MongoDB database** stores users and generated trips.

The frontend communicates with the backend through REST APIs, while the backend acts as the central orchestrator between users, AI services, and the database.

---

## Authentication & Authorization

The application uses JWT-based authentication with HTTP-only cookies.

### Authentication

* User passwords are securely hashed using bcrypt.
* After successful login, a JWT token is generated.
* The token is stored inside an HTTP-only cookie, making it inaccessible to client-side JavaScript and reducing XSS risks.

### Authorization

* Protected routes use authentication middleware.
* The middleware validates the JWT token and identifies the logged-in user.
* Unauthorized requests receive a `401 Unauthorized` response.

---

## AI Agent Design

The AI agent acts as a virtual travel planner.

Its responsibility is to create realistic and personalized travel itineraries while considering:

* Destination
* Budget
* Trip duration
* Travel style
* Group size
* User interests

### Prompt Engineering

The AI is guided using structured prompts that enforce:

* Realistic scheduling
* Logical activity sequencing
* Geographic consistency
* Strict JSON output formatting

### Prompt Injection Protection

User inputs are isolated and treated as data rather than instructions. Additional system-level constraints ensure that users cannot override itinerary generation rules through prompt manipulation.

---

## Key Feature: Selective Day Regeneration

One of the most useful features in NextJourney is selective itinerary regeneration.

Instead of regenerating an entire trip, users can update a single day while keeping the rest of the itinerary unchanged.

Users can:

* Select a specific day
* Provide custom instructions
* Specify the desired number of activities
* Generate a completely new plan for that day

The backend uses the existing trip context along with the new requirements and updates only the selected day in the database.

---

## Design Decisions & Trade-offs

### Source Location for Budget Estimation

**Decision:** Require users to provide a source location in addition to the destination.

**Benefits:**

* Enables more realistic travel cost estimation.
* Allows the AI to estimate transportation costs between the origin and destination.
* Produces more accurate budget breakdowns for flights, trains, or long-distance travel.

**Trade-off:**

* Requires an additional user input during trip creation.
* Cost estimates remain approximate because real-time transportation pricing is not integrated.

---

### Semantic Destination Search

**Decision:** Allow users to enter destinations semantically rather than restricting them to exact city names.

**Examples:**

```text
Konkan
Coastal Region of Maharashtra
Swiss Alps
Romantic Places in Kerala
```

**Benefits:**

* Provides a more natural user experience.
* Supports broader travel intentions and region-based planning.
* Reduces friction compared to forcing users to select a specific city.

**Trade-off:**

* AI interpretation may occasionally differ from the user's intended location.

---

### Budget-Aware Itinerary Generation

**Decision:** Users select a budget type (Low, Medium, High) before trip generation.

**Benefits:**

* Enables the AI to recommend activities that align with the user's budget.
* Influences accommodation recommendations and budget estimates.
* Produces more personalized travel plans.

**Trade-off:**

* Budget categories are generalized and may not perfectly reflect regional pricing differences.

---

### Additional Preference-Based Personalization

**Decision:** Allow users to provide free-form travel preferences.

**Examples:**

```text
Prefer public transport
Avoid crowded places
Luxury dining experiences
Travelling with elderly parents
```

**Benefits:**

* Generates more personalized itineraries.
* Allows users to express constraints beyond predefined form fields.
* Improves itinerary relevance and user satisfaction.

**Trade-off:**

* AI interpretation of free-form text may vary depending on preference complexity.

---

### Activity Time Storage

**Decision:** Store activity timings as readable strings such as:

```text
10:00 AM - 12:00 PM
```

**Benefits:**

* Simpler UI rendering.
* Better readability.
* Less frontend formatting logic.

**Trade-off:**

* Time conflict validation becomes more complex.
* Additional parsing logic is required for advanced scheduling features.

---

### Destination Image Generation

**Decision:** Use the Pexels API to fetch destination-related images using AI-generated search keywords.

**Benefits:**

* Provides visually appealing destination cards.
* Supports semantic destinations such as regions and travel themes.
* Low latency and lightweight integration.

**Trade-off:**

* Images are selected based on keyword relevance and may not always perfectly match the destination.
* External API availability affects image retrieval.

---

### Client-Side Authentication State

**Decision:** Manage authentication using React Context instead of middleware-based route protection.

**Benefits:**

* Simpler frontend architecture.
* Clear separation between frontend and backend responsibilities.
* Easier state management across pages and components.

**Trade-off:**

* Initial authentication verification may introduce a brief loading state.
* Loading indicators are required to maintain a smooth user experience.

---

## Known Limitations

### AI Generation Time

Generating detailed itineraries may take several seconds because the AI must:

* Analyze multiple user constraints.
* Generate day-wise activities.
* Estimate travel budgets.
* Recommend accommodations.
* Return structured JSON responses.

To improve the user experience, a multi-step loading interface keeps users informed during the generation process.

---

### Travel Time Estimation

Although the AI attempts to maintain geographic consistency, travel durations between activities may occasionally be optimistic, especially for less common destinations or densely populated cities.

---

### Budget Estimates Are Approximate

Budget calculations are generated using AI and are intended for planning purposes only.

Actual costs may vary depending on:

* Seasonality
* Transportation availability
* Exchange rates
* Accommodation pricing
* Local economic conditions

---

### Hotel Recommendations

Hotel recommendations are generated using AI-assisted suggestions and estimated pricing.

While recommendations are designed to be realistic and aligned with the selected budget category, real-world pricing and availability may change over time.


## Future Improvements

* Real-time flight integration
* Hotel booking integration
* Weather-aware itinerary planning
* Collaborative trip planning with friends
* Interactive maps and route optimization
* AI-powered budget optimization
* Offline itinerary access

---


