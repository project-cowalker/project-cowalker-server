# URI

## Users

| 메소드 | 경로             | 설명           |
| ------ | ---------------- | -------------- |
| GET    | /users/{user_id} | 회원 조회      |
| POST   | /users           | 회원 가입      |
| PUT    | /users/{user_id} | 회원 정보 수정 |
| DELETE | /users/{user_id} | 회원 탈퇴      |

## RECRUIT

| 메소드 | 경로                                       | 설명                |
| ------ | ------------------------------------------ | ------------------- |
| GET    | /project/{project_id}/recruit              | 모집 공고 전체 조회 |
| POST   | /project/{project_id}/recruit              | 모집 공고 작성      |
| PUT    | /project/{project_id}/recruit/{recruit_id} | 모집 공고 수정      |
| DELETE | /project/{project_id}/recruit/{recruit_id} | 모집 공고 삭제      |
| GET    | /project/{project_id}/recruit/{recruit_id} | 모집 공고 세부 조회 |

## APPLY

| 메소드 | 경로                                   | 설명                    |
| ------ | -------------------------------------- | ----------------------- |
| GET    | /users/{user_idx}/apply?               | 내가쓴 자소서 조회      |
| GET    | /users/{user_idx}/apply/{apply_id}     | 내가쓴 자소서 세부 조회 |
| POST   | /users/{user_idx}/apply                | 자소서 생성             |
| PUT    | /users/{user_idx}/apply/{apply_id}     | 자소서 수정             |
| DELETE | /users/{user_idx}/apply/{apply_id}     | 자소서 삭제             |
| GET    | /recruit/{recruit_id}/apply            | 공고의 자소서 조회      |
| GET    | /recruit/{recruit_id}/apply/{apply_id} | 공고의 자소서 세부 조회 |

## PROJECT 생성

| 메소드 | 경로                                    | 설명          |
| ------ | --------------------------------------- | ------------- |
| POST   | /users/{user_idx}/project               | 프로젝트 생성 |
| PUT    | /users/{user_idx}/project/{project_idx} | 프로젝트 수정 |
| DELETE | /users/{user_idx}/project/{project_idx} | 프로젝트 삭제 |

## 탐색 & 검색

| 메소드 | 경로                                                         | 설명               |
| ------ | ------------------------------------------------------------ | ------------------ |
| GET    | /project?aim=창업&area=서울&position=PM&department=블록체인&keyword=검색어 | 프로젝트 조회      |
| GET    | /project/{project_idx}                                       | 프로젝트 세부 조회 |

## 메시지

| 메소드 | 경로                       | 설명        |
| ------ | -------------------------- | ----------- |
| GET    | /users/{user_idx}/message  | 메시지 조회 |
| GET    | /users/{user_idx}/message/ | 메시지 조회 |
| POST   | /users/{user_idx}/message/ | 메시지 전송 |
| DELETE | /users/{user_idx}/         | 메시지 삭제 |

## 알람

| 메소드 | 경로                            | 설명      |
| ------ | ------------------------------- | --------- |
| GET    | /users/{user_idx}/alarm?count=3 | 알람 조회 |

