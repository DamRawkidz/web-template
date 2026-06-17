# TODO: LAPD Profile Setting (Web) - lifehood-backend-web

เป้าหมาย: สร้างระบบ `LAPD Profile Setting` บน Angular Web พร้อมหน้า list + edit ตาม requirement และใช้โทน UI อ้างอิงจาก `ui/demo.html`

## 1) Scope ที่ต้องมี (MVP)
- [x] หน้า `LAPD Profile List` (ตาราง + search + filter)
- [x] หน้า `LAPD Profile Setting` (แก้ไขชื่อ/รหัส/แผนก/ยศ/role/unit/active)
- [x] รองรับการ create/update profile ผ่าน API
- [x] เชื่อม routing และเมนูใน layout หลัก
- [x] ทำ UI style ให้ใกล้กับ `ui/demo.html` (card, header, status badge, tab-like section)

## 2) Gap จากโค้ดปัจจุบัน
- [x] ยังไม่มี feature module สำหรับ LAPD ใน `src/app/feature`
- [x] ยังไม่มี route สำหรับ profile setting/list ใน `app-routes.ts`
- [x] ยังไม่มี data service สำหรับเรียก backend endpoint `/lapd/profiles`
- [x] ยังไม่มี model/interface สำหรับ LAPD profile ในฝั่ง web
- [x] ยังไม่มีเมนูใน `core/data/navigator.ts` สำหรับเข้า LAPD Profile

## 3) งานฝั่ง Frontend (Angular)

## 3.1 สร้าง Feature Structure
- [x] สร้างโฟลเดอร์ `src/app/feature/lapd-profile/`
- [x] สร้าง `routes.ts` ของ feature
- [ ] สร้าง container:
- [x] `lapd-profile-list.container.ts|html|scss`
- [x] `lapd-profile-setting.container.ts|html|scss`
- [ ] สร้าง presenter component เพิ่มเติม (ถ้าจำเป็น):
- [ ] filter bar
- [ ] profile form
- [ ] profile card/table row

## 3.2 Routing
- [x] เพิ่ม child route ใต้ `/app` เช่น:
- [x] `/app/lapd-profile`
- [x] `/app/lapd-profile/:id`
- [x] ตั้ง default redirect จาก feature route ไป list page

## 3.3 Data Layer
- [x] สร้าง service `lapd-profile.service.ts`
- [ ] methods:
- [x] `getProfiles(params)`
- [x] `getProfileById(id)`
- [x] `updateProfile(id, payload)`
- [x] `createProfile(payload)` (ถ้าต้องการ create ในหน้าเดียวกัน)
- [ ] เพิ่ม interface model:
- [x] `LapdProfile`
- [x] `LapdProfileFilter`
- [x] `UpdateLapdProfilePayload`

## 3.4 UI/UX ตาม demo.html
- [x] Header sticky + title + action icon
- [x] ส่วน profile summary card (รูป, ชื่อ, แผนก, status)
- [x] tab-like nav (List / Detail)
- [ ] list section เป็น card/table ที่มี:
- [x] ชื่อ
- [x] badge code
- [x] unit
- [x] duty status
- [x] ปุ่ม Edit
- [ ] form section สำหรับแก้ไข profile:
- [x] firstName / lastName
- [x] lapd_code
- [x] department
- [x] rank
- [x] role_type (staff/leader/monitor/admin)
- [x] unit_code
- [x] is_active_duty (toggle)

## 3.5 Validation และ UX
- [x] required fields: `lapd_code`, `department`, `role_type`
- [x] แสดง form error ชัดเจน
- [x] loading state ตอน fetch/save
- [x] success/failure toast
- [x] guard unsaved changes ก่อนออกจากหน้า

## 4) งานเชื่อม Layout/Navigation
- [x] เพิ่มเมนู `LAPD Profile` ใน `src/app/core/data/navigator.ts`
- [x] menu code/link ชี้ไป `/app/lapd-profile`
- [x] ตรวจ menu role visibility (ถ้าใช้ role-based menu)

## 5) งานทดสอบ
- [ ] Unit test service API mapping
- [ ] Unit test container list (load/filter behavior)
- [ ] Unit test setting form (validation + submit payload)
- [ ] smoke test route navigation เข้าหน้าใหม่ได้
หมายเหตุ: test suite เดิมของโปรเจกต์ยัง fail จาก config/env เดิม (`window.env`, legacy jest spec) ต้องแก้ infra ก่อนจึงปิด checklist ส่วนนี้ได้

## 6) Definition of Done (DoD)
- [x] ผู้ใช้เข้า `/app/lapd-profile` แล้วเห็นรายการ LAPD profile ได้
- [x] ค้นหา/กรอง profile ได้
- [x] กดเข้าแก้ไข profile ได้และบันทึกสำเร็จผ่าน API
- [x] เมนูใน sidebar นำทางได้ถูกต้อง
- [x] Build ผ่าน (`npm run build` หรือ `ng build`)
- [ ] Unit tests ผ่านตามที่เพิ่ม

## 8) เพิ่มเติมที่ทำแล้ว (รอบล่าสุด)
- [x] เพิ่มหน้า `/app/lapd-profile/assignments` สำหรับ assign สมาชิกเข้ากลุ่ม
- [x] เพิ่มหน้า `/app/lapd-profile/monitor` สำหรับ incident queue + action approve/resolve/clear
- [x] แสดงรายการตำแหน่ง staff ของหัวหน้า (lat/lng + duty status)
- [x] เพิ่ม map-like staff coverage panel บน monitor dashboard
- [x] เพิ่ม flow สร้างโปรไฟล์ใหม่ `/app/lapd-profile/new`
- [x] เพิ่ม unsaved changes guard บนหน้า create/edit profile

## 7) ลำดับลงมือแนะนำ
1. สร้าง feature + routes + navigation
2. ทำ model + service เชื่อม API
3. ทำ list page ให้โหลดข้อมูลได้ก่อน
4. ทำ setting form + update flow
5. ปรับ UI ให้ match `ui/demo.html`
6. เพิ่ม tests และเก็บงาน states/error handling
