FROM ubuntu:22.04

RUN apt-get update && apt-get install -y dotnet-sdk-8.0 && apt-get install -y iputils-ping

WORKDIR /app

COPY *.csproj ./

RUN dotnet restore

COPY . .
  
CMD ["dotnet", "run"]