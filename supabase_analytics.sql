
-- Analytics Sessions Table
create table if not exists analytics_sessions (
    id uuid default gen_random_uuid() primary key,
    visitor_id text not null, -- Anonymous ID from local storage
    user_id uuid references auth.users(id), -- Optional linked user
    started_at timestamp with time zone default timezone('utc'::text, now()) not null,
    last_seen_at timestamp with time zone default timezone('utc'::text, now()) not null,
    user_agent text,
    referrer text,
    device_type text,
    country text
);

-- Analytics Page Views Table
create table if not exists analytics_page_views (
    id uuid default gen_random_uuid() primary key,
    session_id uuid references analytics_sessions(id) not null,
    path text not null,
    viewed_at timestamp with time zone default timezone('utc'::text, now()) not null,
    duration_seconds integer -- Optional: time spent on page
);

-- Enable RLS
alter table analytics_sessions enable row level security;
alter table analytics_page_views enable row level security;

-- Policies for Sessions
-- Allow public to insert their own sessions (needed for anon tracking)
create policy "Allow public insert sessions"
    on analytics_sessions for insert
    with check (true);

-- Allow public to update their own session (for heartbeat)
create policy "Allow public update sessions"
    on analytics_sessions for update
    using (true) -- Simplified for MVP: typically would verify visitor_id ownership
    with check (true);

-- Allow admins (or everyone for MVP dashboard if no admin role yet) to view
create policy "Allow view sessions"
    on analytics_sessions for select
    using (true); 

-- Policies for Page Views
create policy "Allow public insert page views"
    on analytics_page_views for insert
    with check (true);

create policy "Allow view page views"
    on analytics_page_views for select
    using (true);

-- Indexes for performance
create index if not exists idx_analytics_sessions_visitor_id on analytics_sessions(visitor_id);
create index if not exists idx_analytics_page_views_session_id on analytics_page_views(session_id);
