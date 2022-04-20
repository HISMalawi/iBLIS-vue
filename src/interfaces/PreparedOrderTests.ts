import { SpecimenType } from "./SpecimenType";
import { Test } from "./Test";

export interface PreparedOrderTests {
    tests: Test[];
    specimen: SpecimenType;
    reason:string;
  }