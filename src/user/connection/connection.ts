import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

export class Connection {
    getName(): string {
        return 'Default Database Connection';
    }
}

@Injectable()
export class mySQLConnection extends Connection {
    getName(): string {
        return 'MySQL Database Connection';
    }
}

@Injectable()
export class monggoDBConnection extends Connection {
    getName(): string {
        return 'MongoDB Database Connection';
    }
}

export function createConnection(configService: ConfigService) : Connection {
    if(configService.get('DATABASE') == 'mysql') {
        return new mySQLConnection();
    }else if(configService.get('DATABASE') == 'mongoDB'){
        return new monggoDBConnection();
    }else {
        return new Connection();
    }
}