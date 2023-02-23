FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
RUN ls -l
COPY "./WorkGuideBack" "./"
RUN dotnet restore "./WorkGuideBack/WorkGuideBack.csproj"
COPY . .
WORKDIR "/src/WorkGuideBack/WorkGuideBack"
RUN dotnet build "WorkGuideBack.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WorkGuideBack.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM node:alpine as clientBuild
WORKDIR /app
COPY ./workguidefront/package*.json ./
RUN npm install
COPY ./workguidefront/ ./
RUN npm run build

FROM base AS final
WORKDIR /app
COPY --from=clientBuild /app/build/ ./ClientApp
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WorkGuideBack.dll"]