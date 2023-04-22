-- CreateTable
CREATE TABLE "State" (
    "id" SERIAL NOT NULL,
    "state_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lga" (
    "id" SERIAL NOT NULL,
    "lga_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "stateId" INTEGER NOT NULL,

    CONSTRAINT "Lga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ward" (
    "id" SERIAL NOT NULL,
    "ward_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "lgaId" INTEGER NOT NULL,

    CONSTRAINT "Ward_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PollingUnit" (
    "id" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "lga" TEXT NOT NULL,
    "ward" TEXT NOT NULL,
    "puNumber" TEXT NOT NULL,
    "puName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PollingUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Election" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "electionType" TEXT NOT NULL,
    "electionDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Election_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectionPollingUnit" (
    "id" SERIAL NOT NULL,
    "electionId" TEXT NOT NULL,
    "pollingunitId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ElectionPollingUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UnitResult" (
    "id" TEXT NOT NULL,
    "resultImage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pollingunitId" TEXT NOT NULL,
    "electionId" TEXT NOT NULL,

    CONSTRAINT "UnitResult_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PoliticalParty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PoliticalParty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectionPoliticalParty" (
    "id" SERIAL NOT NULL,
    "electionId" TEXT NOT NULL,
    "politicalPartyId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ElectionPoliticalParty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PoliticalPartyUnitResult" (
    "id" SERIAL NOT NULL,
    "voteCount" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "politicalPartyId" INTEGER NOT NULL,
    "unitResultId" TEXT NOT NULL,

    CONSTRAINT "PoliticalPartyUnitResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "State_state_id_key" ON "State"("state_id");

-- CreateIndex
CREATE INDEX "State_state_id_idx" ON "State"("state_id");

-- CreateIndex
CREATE INDEX "Lga_lga_id_idx" ON "Lga"("lga_id");

-- CreateIndex
CREATE INDEX "Ward_ward_id_idx" ON "Ward"("ward_id");

-- CreateIndex
CREATE INDEX "PollingUnit_state_lga_ward_puNumber_idx" ON "PollingUnit"("state", "lga", "ward", "puNumber");

-- CreateIndex
CREATE INDEX "Election_electionType_electionDate_idx" ON "Election"("electionType", "electionDate");

-- CreateIndex
CREATE INDEX "ElectionPollingUnit_electionId_pollingunitId_idx" ON "ElectionPollingUnit"("electionId", "pollingunitId");

-- AddForeignKey
ALTER TABLE "Lga" ADD CONSTRAINT "Lga_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("state_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ward" ADD CONSTRAINT "Ward_lgaId_fkey" FOREIGN KEY ("lgaId") REFERENCES "Lga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectionPollingUnit" ADD CONSTRAINT "ElectionPollingUnit_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectionPollingUnit" ADD CONSTRAINT "ElectionPollingUnit_pollingunitId_fkey" FOREIGN KEY ("pollingunitId") REFERENCES "PollingUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitResult" ADD CONSTRAINT "UnitResult_pollingunitId_fkey" FOREIGN KEY ("pollingunitId") REFERENCES "PollingUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UnitResult" ADD CONSTRAINT "UnitResult_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectionPoliticalParty" ADD CONSTRAINT "ElectionPoliticalParty_electionId_fkey" FOREIGN KEY ("electionId") REFERENCES "Election"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectionPoliticalParty" ADD CONSTRAINT "ElectionPoliticalParty_politicalPartyId_fkey" FOREIGN KEY ("politicalPartyId") REFERENCES "PoliticalParty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoliticalPartyUnitResult" ADD CONSTRAINT "PoliticalPartyUnitResult_politicalPartyId_fkey" FOREIGN KEY ("politicalPartyId") REFERENCES "PoliticalParty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PoliticalPartyUnitResult" ADD CONSTRAINT "PoliticalPartyUnitResult_unitResultId_fkey" FOREIGN KEY ("unitResultId") REFERENCES "UnitResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
