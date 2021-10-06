-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Film" (
    "id" SERIAL NOT NULL,
    "imdbID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Film_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FilmToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Film_imdbID_key" ON "Film"("imdbID");

-- CreateIndex
CREATE UNIQUE INDEX "_FilmToUser_AB_unique" ON "_FilmToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FilmToUser_B_index" ON "_FilmToUser"("B");

-- AddForeignKey
ALTER TABLE "_FilmToUser" ADD FOREIGN KEY ("A") REFERENCES "Film"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FilmToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
