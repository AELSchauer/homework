require_relative '../lib/zip_code_table'
require 'csv'

class SilverPlanSolver
  attr_reader :slcsp_csv, :zip_code_table

  def initialize
    @slcsp_csv ||= CSV.open("./data/slcsp.csv", headers: true, header_converters: :symbol).read
    @zip_code_table ||= ZipCodeTable.new
  end

  def find_slcsps
    slcsp_csv.each do |row|
      zip_code = zip_code_table.find(row[:zipcode])
      rate = zip_code.second_lowest_silver_plan_rate
      row[:rate] = rate
    end
  end

  def write_slcsps_answers_to_file
    CSV.open("./data/answers.csv", "wb") do |csv|
      csv << slcsp_csv.headers
      find_slcsps.each do |slcsp|
        csv << slcsp
      end
    end
    puts "Done. See the /data/answers.csv for the outputted data."
  end
end

solver = SilverPlanSolver.new
solver.write_slcsps_answers_to_file
