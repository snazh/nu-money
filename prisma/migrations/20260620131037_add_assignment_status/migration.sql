-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('pending', 'approved', 'rejected');

-- AlterTable
ALTER TABLE "TaskAssignment" ADD COLUMN     "status" "AssignmentStatus" NOT NULL DEFAULT 'pending';
