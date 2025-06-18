"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("../../../src/ngtsc/docs/src/entities");
const testing_1 = require("../../../src/ngtsc/file_system/testing");
const testing_2 = require("../../../src/ngtsc/testing");
const env_1 = require("../env");
const testFiles = (0, testing_2.loadStandardTestFiles)({ fakeCommon: true });
(0, testing_1.runInEachFileSystem)(() => {
    let env;
    describe('ngtsc interface docs extraction', () => {
        beforeEach(() => {
            env = env_1.NgtscTestEnvironment.setup(testFiles);
            env.tsconfig();
        });
        it('should extract interfaces', () => {
            env.write('index.ts', `
        export interface UserProfile {}

        export interface CustomSlider {}
      `);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(2);
            expect(docs[0].name).toBe('UserProfile');
            expect(docs[0].entryType).toBe(entities_1.EntryType.Interface);
            expect(docs[1].name).toBe('CustomSlider');
            expect(docs[1].entryType).toBe(entities_1.EntryType.Interface);
        });
        it('should extract interface members', () => {
            env.write('index.ts', `
        export interface UserProfile {
          firstName(): string;
          age: number;
        }
      `);
            const docs = env.driveDocsExtraction('index.ts');
            const interfaceEntry = docs[0];
            expect(interfaceEntry.members.length).toBe(2);
            const methodEntry = interfaceEntry.members[0];
            expect(methodEntry.memberType).toBe(entities_1.MemberType.Method);
            expect(methodEntry.name).toBe('firstName');
            expect(methodEntry.implementation.returnType).toBe('string');
            const propertyEntry = interfaceEntry.members[1];
            expect(propertyEntry.memberType).toBe(entities_1.MemberType.Property);
            expect(propertyEntry.name).toBe('age');
            expect(propertyEntry.type).toBe('number');
        });
        it('should extract call signatures', () => {
            env.write('index.ts', `
        export interface UserProfile {
          (name: string): string;
        }
      `);
            const docs = env.driveDocsExtraction('index.ts');
            const interfaceEntry = docs[0];
            expect(interfaceEntry.members.length).toBe(1);
            const methodEntry = interfaceEntry.members[0];
            expect(methodEntry.memberType).toBe(entities_1.MemberType.Method);
            expect(methodEntry.name).toBe('');
            expect(methodEntry.implementation.returnType).toBe('string');
        });
        it('should extract a method with a rest parameter', () => {
            env.write('index.ts', `
        export interface UserProfile {
          getNames(prefix: string, ...ids: string[]): string[];
        }
      `);
            const docs = env.driveDocsExtraction('index.ts');
            const interfaceEntry = docs[0];
            const methodEntry = interfaceEntry.members[0];
            const [prefixParamEntry, idsParamEntry] = methodEntry.implementation.params;
            expect(prefixParamEntry.name).toBe('prefix');
            expect(prefixParamEntry.type).toBe('string');
            expect(prefixParamEntry.isRestParam).toBe(false);
            expect(idsParamEntry.name).toBe('ids');
            expect(idsParamEntry.type).toBe('string[]');
            expect(idsParamEntry.isRestParam).toBe(true);
        });
        it('should extract interface method params', () => {
            env.write('index.ts', `
        export interface UserProfile {
          setPhone(num: string, area?: string): void;
        }
      `);
            const docs = env.driveDocsExtraction('index.ts');
            const interfaceEntry = docs[0];
            expect(interfaceEntry.members.length).toBe(1);
            const methodEntry = interfaceEntry.members[0];
            expect(methodEntry.memberType).toBe(entities_1.MemberType.Method);
            expect(methodEntry.name).toBe('setPhone');
            expect(methodEntry.implementation.params.length).toBe(2);
            const [numParam, areaParam] = methodEntry.implementation.params;
            expect(numParam.name).toBe('num');
            expect(numParam.isOptional).toBe(false);
            expect(numParam.type).toBe('string');
            expect(areaParam.name).toBe('area');
            expect(areaParam.isOptional).toBe(true);
            expect(areaParam.type).toBe('string | undefined');
        });
        it('should not extract private interface members', () => {
            env.write('index.ts', `
        export interface UserProfile {
            private ssn: string;
            private getSsn(): string;
            private static printSsn(): void;
        }
      `);
            const docs = env.driveDocsExtraction('index.ts');
            const interfaceEntry = docs[0];
            expect(interfaceEntry.members.length).toBe(0);
        });
        it('should extract member tags', () => {
            // Test both properties and methods with zero, one, and multiple tags.
            env.write('index.ts', `
        export interface UserProfile {
            eyeColor: string;
            protected name: string;
            readonly age: number;
            address?: string;
            static country: string;
            protected readonly birthday: string;

            getEyeColor(): string;
            protected getName(): string;
            getAge?(): number;
            static getCountry(): string;
            protected getBirthday?(): string;
        }
      `);
            const docs = env.driveDocsExtraction('index.ts');
            const interfaceEntry = docs[0];
            expect(interfaceEntry.members.length).toBe(11);
            const [eyeColorMember, nameMember, ageMember, addressMember, countryMember, birthdayMember, getEyeColorMember, getNameMember, getAgeMember, getCountryMember, getBirthdayMember,] = interfaceEntry.members;
            // Properties
            expect(eyeColorMember.memberTags.length).toBe(0);
            expect(nameMember.memberTags).toEqual([entities_1.MemberTags.Protected]);
            expect(ageMember.memberTags).toEqual([entities_1.MemberTags.Readonly]);
            expect(addressMember.memberTags).toEqual([entities_1.MemberTags.Optional]);
            expect(countryMember.memberTags).toEqual([entities_1.MemberTags.Static]);
            expect(birthdayMember.memberTags).toContain(entities_1.MemberTags.Protected);
            expect(birthdayMember.memberTags).toContain(entities_1.MemberTags.Readonly);
            // Methods
            expect(getEyeColorMember.memberTags.length).toBe(0);
            expect(getNameMember.memberTags).toEqual([entities_1.MemberTags.Protected]);
            expect(getAgeMember.memberTags).toEqual([entities_1.MemberTags.Optional]);
            expect(getCountryMember.memberTags).toEqual([entities_1.MemberTags.Static]);
            expect(getBirthdayMember.memberTags).toContain(entities_1.MemberTags.Protected);
            expect(getBirthdayMember.memberTags).toContain(entities_1.MemberTags.Optional);
        });
        it('should extract getters and setters', () => {
            // Test getter-only, a getter + setter, and setter-only.
            env.write('index.ts', `
        export interface UserProfile {
          get userId(): number;

          get userName(): string;
          set userName(value: string);

          set isAdmin(value: boolean);
        }
      `);
            const docs = env.driveDocsExtraction('index.ts');
            const interfaceEntry = docs[0];
            expect(interfaceEntry.entryType).toBe(entities_1.EntryType.Interface);
            expect(interfaceEntry.members.length).toBe(4);
            const [userIdGetter, userNameGetter, userNameSetter, isAdminSetter] = interfaceEntry.members;
            expect(userIdGetter.name).toBe('userId');
            expect(userIdGetter.memberType).toBe(entities_1.MemberType.Getter);
            expect(userNameGetter.name).toBe('userName');
            expect(userNameGetter.memberType).toBe(entities_1.MemberType.Getter);
            expect(userNameSetter.name).toBe('userName');
            expect(userNameSetter.memberType).toBe(entities_1.MemberType.Setter);
            expect(isAdminSetter.name).toBe('isAdmin');
            expect(isAdminSetter.memberType).toBe(entities_1.MemberType.Setter);
        });
        it('should extract inherited members', () => {
            env.write('index.ts', `
        interface Ancestor {
          id: string;
          value: string|number;

          save(value: string|number): string|number;
        }

        interface Parent extends Ancestor {
          name: string;
        }

        export interface Child extends Parent {
          age: number;
          value: number;

          save(value: number): number;
          save(value: string|number): string|number;
        }`);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(1);
            const interfaceEntry = docs[0];
            expect(interfaceEntry.members.length).toBe(6);
            const [ageEntry, valueEntry, numberSaveEntry, unionSaveEntry, nameEntry, idEntry] = interfaceEntry.members;
            expect(ageEntry.name).toBe('age');
            expect(ageEntry.memberType).toBe(entities_1.MemberType.Property);
            expect(ageEntry.type).toBe('number');
            expect(ageEntry.memberTags).not.toContain(entities_1.MemberTags.Inherited);
            expect(valueEntry.name).toBe('value');
            expect(valueEntry.memberType).toBe(entities_1.MemberType.Property);
            expect(valueEntry.type).toBe('number');
            expect(valueEntry.memberTags).not.toContain(entities_1.MemberTags.Inherited);
            expect(numberSaveEntry.name).toBe('save');
            expect(numberSaveEntry.memberType).toBe(entities_1.MemberType.Method);
            expect(numberSaveEntry.implementation.returnType).toBe('number');
            expect(numberSaveEntry.memberTags).not.toContain(entities_1.MemberTags.Inherited);
            expect(unionSaveEntry.name).toBe('save');
            expect(unionSaveEntry.memberType).toBe(entities_1.MemberType.Method);
            expect(unionSaveEntry.implementation.returnType).toBe('string | number');
            expect(unionSaveEntry.memberTags).not.toContain(entities_1.MemberTags.Inherited);
            expect(nameEntry.name).toBe('name');
            expect(nameEntry.memberType).toBe(entities_1.MemberType.Property);
            expect(nameEntry.type).toBe('string');
            expect(nameEntry.memberTags).toContain(entities_1.MemberTags.Inherited);
            expect(idEntry.name).toBe('id');
            expect(idEntry.memberType).toBe(entities_1.MemberType.Property);
            expect(idEntry.type).toBe('string');
            expect(idEntry.memberTags).toContain(entities_1.MemberTags.Inherited);
        });
        it('should extract inherited getters/setters', () => {
            env.write('index.ts', `
        interface Ancestor {
          get name(): string;
          set name(v: string);

          get id(): string;
          set id(v: string);

          get age(): number;
          set age(v: number);
        }

        interface Parent extends Ancestor {
          name: string;
        }

        export interface Child extends Parent {
          get id(): string;
        }`);
            const docs = env.driveDocsExtraction('index.ts');
            expect(docs.length).toBe(1);
            const interfaceEntry = docs[0];
            expect(interfaceEntry.members.length).toBe(4);
            const [idEntry, nameEntry, ageGetterEntry, ageSetterEntry] = interfaceEntry.members;
            // When the child interface overrides an accessor pair with another accessor, it overrides
            // *both* the getter and the setter, resulting (in this case) in just a getter.
            expect(idEntry.name).toBe('id');
            expect(idEntry.memberType).toBe(entities_1.MemberType.Getter);
            expect(idEntry.type).toBe('string');
            expect(idEntry.memberTags).not.toContain(entities_1.MemberTags.Inherited);
            // When the child interface overrides an accessor with a property, the property takes
            // precedence.
            expect(nameEntry.name).toBe('name');
            expect(nameEntry.memberType).toBe(entities_1.MemberType.Property);
            expect(nameEntry.type).toBe('string');
            expect(nameEntry.memberTags).toContain(entities_1.MemberTags.Inherited);
            expect(ageGetterEntry.name).toBe('age');
            expect(ageGetterEntry.memberType).toBe(entities_1.MemberType.Getter);
            expect(ageGetterEntry.type).toBe('number');
            expect(ageGetterEntry.memberTags).toContain(entities_1.MemberTags.Inherited);
            expect(ageSetterEntry.name).toBe('age');
            expect(ageSetterEntry.memberType).toBe(entities_1.MemberType.Setter);
            expect(ageSetterEntry.type).toBe('number');
            expect(ageSetterEntry.memberTags).toContain(entities_1.MemberTags.Inherited);
        });
    });
});
