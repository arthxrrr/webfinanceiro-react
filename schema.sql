-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  email text,
  full_name text,
  updated_at timestamp with time zone
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Create categories table
create table categories (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  type text check (type in ('income', 'expense')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table categories enable row level security;

create policy "Users can view their own categories." on categories
  for select using (auth.uid() = user_id);

create policy "Users can insert their own categories." on categories
  for insert with check (auth.uid() = user_id);

-- Create transactions table
create table transactions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  description text not null,
  amount decimal(12,2) not null,
  type text check (type in ('income', 'expense')) not null,
  category_id uuid references categories(id),
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table transactions enable row level security;

create policy "Users can view their own transactions." on transactions
  for select using (auth.uid() = user_id);

create policy "Users can insert their own transactions." on transactions
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own transactions." on transactions
  for update using (auth.uid() = user_id);

create policy "Users can delete their own transactions." on transactions
  for delete using (auth.uid() = user_id);

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  
  -- Insert default categories
  insert into public.categories (user_id, name, type) values
  (new.id, 'Salário', 'income'),
  (new.id, 'Freelance', 'income'),
  (new.id, 'Alimentação', 'expense'),
  (new.id, 'Transporte', 'expense'),
  (new.id, 'Moradia', 'expense'),
  (new.id, 'Lazer', 'expense');
  
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
