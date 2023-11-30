import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { UserInterceptorDto } from 'src/users/dto/user.dto.interceptor';
import { User } from 'src/users/model/user.entity';
import { Repository } from 'typeorm';
import { ApprovedReportDto } from './dto/approve-report-dto';
import CreateReportDto from './dto/create-report-dto';
import { GetEstimateDto } from './dto/get-estimate-dto';
import { ReportDto } from './dto/report.dto';
import { Report } from './model/report.entity';


@Injectable()
export class ReportsService {
    constructor(@InjectRepository(Report) private readonly repository: Repository<Report>){}

    async createReport(reportDto: CreateReportDto, user: User): Promise<Report> {
        //reportDto is the same shape with the CreateReportDto class.Because the id is auto generated
        const report = this.repository.create(reportDto)
        //Behind the scene the repository will extract only the ID.
        report.user = user

        return this.repository.save(report)
    }

    async getReportById(id: string): Promise<Report> {
        if(!id){
            throw new NotFoundException('report not found')
        }
       return this.repository.findOneBy({ id })
    }

    async changeApproval(id: string, approvedDto: ApprovedReportDto) {
       const { approved } = approvedDto;
       const report = await this.getReportById(id)

       if(report){
        report.approved = approved
       }

       return this.repository.save(report)       
    }

    async createEstimate({ make, model, lng, lat, year, milage }: GetEstimateDto) {
       return await this.repository.createQueryBuilder()
       .select('AVG(price)', 'price')
       .where('make = :make', { make: make })
       .andWhere('mode = :model', { model: model })
       .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
       .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
       .andWhere('year - :year BETWEEN -3 AND 3', { year })
       .andWhere('approved IS TRUE')
       .orderBy('ABS(milage - :milage)', 'DESC')
       .setParameters({ milage })
       .limit(3)
       .getRawOne()
    }
}
