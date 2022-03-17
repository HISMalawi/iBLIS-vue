import { Test } from "@/interfaces/Test";
import { Patient } from "@/interfaces/Patient";
import { User } from "@/interfaces/User";
import { Ward } from "@/interfaces/Ward";
import { VisitType } from "@/interfaces/VisitType";

export interface Order {
    visit_type: VisitType,
    requesting_location: Ward,
    requesting_physician: string,
    specimen_type_id: number,
    tests: Array<Test>,
    patient:Patient,
    user: User,
}

