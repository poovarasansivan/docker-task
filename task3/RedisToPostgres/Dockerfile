# Use .NET SDK image
FROM mcr.microsoft.com/dotnet/sdk:9.0-preview AS build

WORKDIR /app

# Copy the project file (already in this folder)
COPY *.csproj ./

# Restore dependencies
RUN dotnet restore ./RedisToPostgres.csproj

# Copy all remaining files (from current folder)
COPY . .

# Build the app
RUN dotnet build RedisToPostgres.csproj -c Release -o /app/build

# Publish the app
RUN dotnet publish RedisToPostgres.csproj -c Release -o /app/publish

# Run the app
ENTRYPOINT ["dotnet", "/app/publish/RedisToPostgres.dll"]
